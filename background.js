chrome.browserAction.onClicked.addListener(function() {

    chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
        
        //console.log(tab);

        var parsed = $.url.parse(tab[0].url);
        var videoID = ''; //'wx6_MWVHZ4g';
        var playlistID = '';

        // check if url is youtube watch
        if(parsed.params && parsed.params.hasOwnProperty('v')) {
            videoID = parsed.params.v;
        }

        // check if url is youtube embed
        if(parsed.path.indexOf("/embed/") != -1 || parsed.path.indexOf("/v/") != -1) {
            videoID = parsed.path.split("/")[2];
        }
        // Show when we're watching a video on youtube.
        if (videoID.length > 0) {

            // check if url is youtube has playlist
            if(parsed.params && parsed.params.hasOwnProperty('list')) {
                playlistID = parsed.params.list;
            }

            //var youtubeRegex = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;

            //console.log(tab[0].url.match(youtubeRegex));
            //var URL_list = "http://dev.opera.com";
            //var URL_list = "https://www.youtube.com/watch?v=wx6_MWVHZ4g";
            //var URL_list = "https://www.youtube.com/embed/wx6_MWVHZ4g?autoplay=true";
            //var URL_list = "https://www.youtube.com/tv?vq=medium#/watch?v="+videoID+"&mode=transport&autoplay=true";
            //
            var URL_list_params = {
                'v': videoID,
                'mode': 'transport'
            };

            // not working now :(
            /*if (playlistID.length > 0){
                URL_list_params['list'] = playlistID;
            }*/

            var URL_list = $.url.build({
                protocol: 'https',
                host: 'www.youtube.com',
                path: '/tv?vq=medium#/watch',
                params: URL_list_params
            });
            
            var winHeight = parseInt(window.innerHeight);
            var winWidth = parseInt(window.innerWidth);
            
            var sw_width = 520;
            var sw_height = 280;

            //chrome.tabs.create( { "url": "http://dev.opera.com" } );
            var windowObjCreationOptions = {
                'url': URL_list, 
                'top': Math.abs(parseInt( (winHeight / 2) - (sw_height / 2) )),
                'left': Math.abs(parseInt( (winWidth / 2) - (sw_width / 2) )),
                'width': sw_width,
                'height': sw_height,
                'type': 'popup',
                'focused': true,
                'tabId': tab[0].id,
                'incognito': false // 
            };

            // create player popout
            chrome.windows.create(windowObjCreationOptions);

            // close tab
            //chrome.tabs.remove(tab[0].id);

        } else { // else check youtube video ID

            var notificationsID = 'notification_id_popup_yt';
            var myNotificationOptions = {
                'type': 'basic',
                'iconUrl': 'youtube-70-2.png',
                'title': 'Information',
                'message': 'Ops! This is not a valid URL. Try on Youtube.com.',
                'eventTime': Date.now() + 5000 // close after 5 secs
            };
            chrome.notifications.create(notificationsID, myNotificationOptions);
            
            setTimeout(function(){
                chrome.notifications.clear(notificationsID);
            }, 5000);
            

        } // end check youtube video ID
    });
});
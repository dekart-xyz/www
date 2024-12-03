// document.getElementById('mode').addEventListener('click', () => {

//   document.body.classList.toggle('dark');
//   localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');

// });

// if (localStorage.getItem('theme') === 'dark') {

//   document.body.classList.add('dark');

// }

/* eslint-disable */
var clipboard = new ClipboardJS('.btn-clipboard');

clipboard.on('success', function(e) {
    /*
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    */

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});
/* eslint-enable */

// code which reads ?ref=ads-c-* or ?utm_campaign= from entry URL and adds utm_campaign= to all all links on the page
(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var ref = urlParams.get('ref');
    var utm_campaign = urlParams.get('utm_campaign');
    if (ref || utm_campaign) {
        var links = document.querySelectorAll('a');
        links.forEach(function(link) {
            var href = link.getAttribute('href');
            if (href) {
                if (ref) {
                    if (href.indexOf('?') === -1) {
                        href += '?';
                    } else {
                        href += '&';
                    }
                    href += 'utm_campaign=' + ref;
                }
                if (utm_campaign) {
                    if (href.indexOf('?') === -1) {
                        href += '?';
                    } else {
                        href += '&';
                    }
                    href += 'utm_campaign=' + utm_campaign;
                }
                link.setAttribute('href', href);
            }
        });
    }
}
)();
// document.getElementById('mode').addEventListener('click', () => {

//   document.body.classList.toggle('dark');
//   localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');

// });

// if (localStorage.getItem('theme') === 'dark') {

//   document.body.classList.add('dark');

// }

function attachCodeCopyButtons() {
    var codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(function(pre) {
        var code = pre.querySelector('code');
        var text = code ? code.textContent : pre.textContent;

        if (!text || text.split('\n').length < 2 || pre.parentNode.classList.contains('code-block')) {
            return;
        }

        var wrapper = pre.parentNode.classList.contains('highlight') ? pre.parentNode : document.createElement('div');

        if (!wrapper.classList.contains('highlight')) {
            wrapper.className = 'code-block';
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);
        } else {
            wrapper.classList.add('code-block');
        }

        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'code-copy-button';
        button.setAttribute('aria-label', 'Copy code');
        button.setAttribute('title', 'Copy code');
        button.setAttribute('data-clipboard-text', text.replace(/\n$/, ''));
        button.innerHTML = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        wrapper.appendChild(button);
    });
}

attachCodeCopyButtons();

/* eslint-disable */
var clipboard = new ClipboardJS('.btn-clipboard, .code-copy-button');

clipboard.on('success', function(e) {
    /*
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    */

    e.clearSelection();

    if (e.trigger.classList.contains('code-copy-button')) {
        e.trigger.classList.add('is-copied');
        e.trigger.setAttribute('aria-label', 'Copied');
        e.trigger.setAttribute('title', 'Copied');
        window.setTimeout(function() {
            e.trigger.classList.remove('is-copied');
            e.trigger.setAttribute('aria-label', 'Copy code');
            e.trigger.setAttribute('title', 'Copy code');
        }, 1600);
    }
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

// https://plausible.io/docs/custom-event-goals
window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) }

function track (event, data) {
  if (window.plausible) {
      window.plausible(event, data)
  }
}


// code which reads ?ref=[referral] from entry URL and calls trackEvent('referral', [referral]) when link is clicked
(function() {
        var links = document.querySelectorAll('a');
        links.forEach(function(link) {
            var href = link.getAttribute('href');
            if (!href) {
                return;
            }
            var urlParams = new URLSearchParams(link.search);
            var ref = urlParams.get('ref');
            if (!ref) {
                return;
            }
            link.addEventListener('click', function() {
                track(ref);
            });
        });
}
)();

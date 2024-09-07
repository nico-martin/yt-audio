// @ts-nocheck
let currentUrl = location.href;

const hasMatomo = () =>
  Boolean(process.env.MATOMO_URL && process.env.MATOMO_SITE_ID);

export const initMatomo = () => {
  if (!hasMatomo()) {
    return;
  }

  var _paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function () {
    var u = process.env.MATOMO_URL;
    _paq.push(['setTrackerUrl', u + 'piwik.php']);
    _paq.push(['setSiteId', process.env.MATOMO_SITE_ID]);
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.async = true;
    g.defer = true;
    g.src = u + 'piwik.js';
    s.parentNode.insertBefore(g, s);
  })();
  window._paq = _paq;
};

export const matomoSetPage = (url) => {
  if (!hasMatomo()) {
    return;
  }

  var _paq = window._paq || [];
  _paq.push(['setReferrerUrl', currentUrl]);

  currentUrl = url;
  _paq.push(['setCustomUrl', currentUrl]);
  _paq.push(['deleteCustomVariables', 'page']);
  _paq.push(['setGenerationTimeMs', 0]);
  _paq.push(['trackPageView']);

  const content = document.getElementById('content');
  _paq.push(['MediaAnalytics::scanForMedia', content]);
  _paq.push(['FormAnalytics::scanForForms', content]);
  _paq.push(['trackContentImpressionsWithinNode', content]);
  _paq.push(['enableLinkTracking']);
  window._paq = _paq;
};

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('minotaur-store').then((cache) => cache.addAll([

'/Minotaur/HTML_SRC/contrib/auto-render.js',
'/Minotaur/HTML_SRC/contrib/copy-tex.css',
'/Minotaur/HTML_SRC/contrib/copy-tex.js',
'/Minotaur/HTML_SRC/contrib/mathtex-script-type.js',
'/Minotaur/HTML_SRC/contrib/mhchem.js',
'/Minotaur/HTML_SRC/contrib/render-a11y-string.js',

'/Minotaur/HTML_SRC/fonts/KaTeX_AMS-Regular.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_AMS-Regular.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_AMS-Regular.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Caligraphic-Bold.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Caligraphic-Bold.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Caligraphic-Bold.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Caligraphic-Regular.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Caligraphic-Regular.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Caligraphic-Regular.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Fraktur-Bold.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Fraktur-Bold.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Fraktur-Bold.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Fraktur-Regular.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Fraktur-Regular.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Fraktur-Regular.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Main-Bold.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Main-Bold.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Main-Bold.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Main-BoldItalic.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Main-BoldItalic.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Main-BoldItalic.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Main-Italic.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Main-Italic.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Main-Italic.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Main-Regular.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Main-Regular.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Main-Regular.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Math-BoldItalic.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Math-BoldItalic.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Math-BoldItalic.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Math-Italic.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Math-Italic.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Math-Italic.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_SansSerif-Bold.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_SansSerif-Bold.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_SansSerif-Bold.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_SansSerif-Italic.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_SansSerif-Italic.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_SansSerif-Italic.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_SansSerif-Regular.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_SansSerif-Regular.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_SansSerif-Regular.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Script-Regular.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Script-Regular.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Script-Regular.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Size1-Regular.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Size1-Regular.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Size1-Regular.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Size2-Regular.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Size2-Regular.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Size2-Regular.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Size3-Regular.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Size3-Regular.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Size3-Regular.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Size4-Regular.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Size4-Regular.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Size4-Regular.woff2',
'/Minotaur/HTML_SRC/fonts/KaTeX_Typewriter-Regular.ttf',
'/Minotaur/HTML_SRC/fonts/KaTeX_Typewriter-Regular.woff',
'/Minotaur/HTML_SRC/fonts/KaTeX_Typewriter-Regular.woff2',

'/Minotaur/HTML_SRC/icons/128.png',
'/Minotaur/HTML_SRC/icons/16.png',
'/Minotaur/HTML_SRC/icons/32.png',
'/Minotaur/HTML_SRC/icons/64.png',
'/Minotaur/HTML_SRC/icons/logo.png',

'/Minotaur/HTML_SRC/katex.css',

'/Minotaur/HTML_SRC/style_light.css',
'/Minotaur/HTML_SRC/style_main.css',
'/Minotaur/HTML_SRC/index.html',
'/Minotaur/HTML_SRC/KxaGqtkBwthDlxV.jpg',
'/Minotaur/HTML_SRC/lcIApCbFpPichcX.jpg',
'/Minotaur/HTML_SRC/promo_label.jpg',
'/Minotaur/HTML_SRC/android_fn.js',
'/Minotaur/HTML_SRC/Arial_Digiscream_Normal-normal.js',
'/Minotaur/HTML_SRC/block_gen.js',
'/Minotaur/HTML_SRC/canvg.min.js',
'/Minotaur/HTML_SRC/chart_theme.js',
'/Minotaur/HTML_SRC/cookie_settings.js',
'/Minotaur/HTML_SRC/exporting.js',
'/Minotaur/HTML_SRC/exporting.src.js',
'/Minotaur/HTML_SRC/heatmap.js',
'/Minotaur/HTML_SRC/highcharts.js',
'/Minotaur/HTML_SRC/highcharts-3d.js',
'/Minotaur/HTML_SRC/highcharts-3d.src.js',
'/Minotaur/HTML_SRC/highstock.js',
'/Minotaur/HTML_SRC/html_new_gen_main.js',
'/Minotaur/HTML_SRC/index.js',

'/Minotaur/HTML_SRC/jquery.mCustomScrollbar.js',
'/Minotaur/HTML_SRC/jquery.mousewheel.js',
'/Minotaur/HTML_SRC/jquery.mousewheel-3.0.6.js',
'/Minotaur/HTML_SRC/jquery-3.6.0.js',
'/Minotaur/HTML_SRC/jspdf.plugin.autotable.js',
'/Minotaur/HTML_SRC/jspdf.src.js',
'/Minotaur/HTML_SRC/jszip.js',
'/Minotaur/HTML_SRC/katex.js',
'/Minotaur/HTML_SRC/lng_fn.js',
'/Minotaur/HTML_SRC/main.js',
'/Minotaur/HTML_SRC/nodejs_fn.js',
'/Minotaur/HTML_SRC/offline-exporting.src.js',
'/Minotaur/HTML_SRC/style_manager.js',
'/Minotaur/HTML_SRC/svg2pdf.src.js',
'/Minotaur/HTML_SRC/sw.js',
'/Minotaur/HTML_SRC/xlsx.full.min.js',
'/Minotaur/HTML_SRC/README.md',
'/Minotaur/HTML_SRC/PrivacyPolicy.pdf',
'/Minotaur/HTML_SRC/apple-touch-icon.png',
'/Minotaur/HTML_SRC/apple-touch-icon+.png',
'/Minotaur/HTML_SRC/apple-touch-icon-120x120.png',
'/Minotaur/HTML_SRC/apple-touch-icon-120x120+.png',
'/Minotaur/HTML_SRC/apple-touch-icon-152x152.png',
'/Minotaur/HTML_SRC/apple-touch-icon-152x152+.png',
'/Minotaur/HTML_SRC/apple-touch-icon-180x180.png',
'/Minotaur/HTML_SRC/apple-touch-icon-180x180+.png',
'/Minotaur/HTML_SRC/apple-touch-icon-192x192.png',
'/Minotaur/HTML_SRC/apple-touch-icon-512x512.png',
'/Minotaur/HTML_SRC/apple-touch-icon-512x512opacity.png',
'/Minotaur/HTML_SRC/apple-touch-icon-76x76.png',
'/Minotaur/HTML_SRC/apple-touch-icon-76x76+.png',
'/Minotaur/HTML_SRC/arrow-down-circle.png',
'/Minotaur/HTML_SRC/cup_bronze.png',
'/Minotaur/HTML_SRC/cup_founder.png',
'/Minotaur/HTML_SRC/cup_gold.png',
'/Minotaur/HTML_SRC/cup_silver.png',
'/Minotaur/HTML_SRC/download_me.png',
'/Minotaur/HTML_SRC/icon-hires.png',
'/Minotaur/HTML_SRC/icon-hires+.png',
'/Minotaur/HTML_SRC/icon-normal.png',
'/Minotaur/HTML_SRC/icon-normal+.png',
'/Minotaur/HTML_SRC/arrow_01.svg',
'/Minotaur/HTML_SRC/arrow_02.svg',
'/Minotaur/HTML_SRC/window_controls_icons.svg',
'/Minotaur/HTML_SRC/window_controls_icons_light.svg',
'/Minotaur/HTML_SRC/Arial_Digiscream_Normal.ttf',
'/Minotaur/HTML_SRC/files.txt',
'/Minotaur/HTML_SRC/manifest.webmanifest',
'/Minotaur/HTML_SRC/meas_light.svg',
'/Minotaur/HTML_SRC/meas_main.svg',
'/Minotaur/HTML_SRC/meas_press.svg',
'/Minotaur/HTML_SRC/rec_light.svg',
'/Minotaur/HTML_SRC/rec_main.svg',
'/Minotaur/HTML_SRC/rec_press.svg',
'/Minotaur/HTML_SRC/gps_ok.svg',
'/Minotaur/HTML_SRC/gps_no.svg',
'/Minotaur/HTML_SRC/FileSaver.js'
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});

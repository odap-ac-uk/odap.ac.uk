# convert to png

gm convert -background white -gravity center -extent 1500x1500+0+0 r3.png r3b.png

inkscape --export-type png tgcc4.svg -o tgcc4.png
inkscape --export-type png logo.svg -o logo.png


# convert svg to png and make it a square

inkscape --export-type png i4c-map-bare.svg -o i4c-map-bare.png
gm identify i4c-map-bare.png
gm convert -background transparent -gravity center -extent 3300x2550+0+0 i4c-map-bare.png i4c-map-bare.png


inkscape --export-type png odap.svg -o odap.png
gm identify odap.png
gm convert -background white -gravity center -extent 249x249+0+0 odap.png odap.png

inkscape --export-type png roboscope.svg -o roboscope.png
gm identify roboscope.png
gm convert -background white -gravity center -extent 900x900+0+0 roboscope.png roboscope.png

inkscape --export-type png red-button.svg -o red-button.png
gm identify red-button.png
gm convert -background white -gravity center -extent 900x900+0+0 red-button.png red-button.png


# find and replace recursively in files

grep -rl --exclude-dir=_site --exclude-dir=.git --exclude-dir=img --exclude-dir=.jekyll-cache --exclude-dir=manual "/assets/images/odap-logo.svg" . | xargs sed -i '' 's|/assets/images/odap-logo.svg|/assets/img/logo/logo.svg|g'

grep -rl --exclude-dir=_site --exclude-dir=.git --exclude-dir=img --exclude-dir=.jekyll-cache --exclude-dir=manual "color" .
grep -rl --exclude-dir=_site --exclude-dir=.git --exclude-dir=img --exclude-dir=.jekyll-cache --exclude-dir=manual "#017BFF" .

grep -rl --exclude-dir=_site --exclude-dir=.git --exclude-dir=img --exclude-dir=.jekyll-cache --exclude-dir=manual "/assets/images/odap-logo.svg" . | xargs sed -i '' 's|/assets/images/odap-logo.svg|/assets/img/logo/logo.svg|g'

__
## test commands

grep -r "assets/images/" --exclude-dir=_site --exclude-dir=.git --exclude-dir=img ./

clear

sed -i 's|img/about/ab2.jpg|img/art/ab2.jpg|g' 

__
# add padding on a pdf

inkscape red-button.svg -D --export-type=pdf --export-overwrite --export-margin=500



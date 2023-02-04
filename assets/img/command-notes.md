# convert to png

gm convert -background white -gravity center -extent 1500x1500+0+0 r3.png r3b.png

inkscape --export-type png tgcc4.svg -o tgcc4.png

# convert svg to png and make it a square
inkscape --export-type png microtrials.svg -o microtrials.png
gm identify microtrials.png
gm convert -background white -gravity center -extent 636x636+0+0 microtrials.png microtrials.png

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

grep -rl --exclude-dir=_site --exclude-dir=.git "img/about/view.png" . | xargs sed -i '' 's|img/about/view.png|img/art/view.png|g'

grep -rl --exclude-dir=_site --exclude-dir=.git --exclude-dir=img "img/feature/" . | xargs sed -i '' 's|img/feature/|img/art/|g'

grep -rl --exclude-dir=_site --exclude-dir=.git --exclude-dir=img "img/project/" . | xargs sed -i '' 's|img/project/|img/art/|g'

grep -rl --exclude-dir=_site --exclude-dir=.git --exclude-dir=img "img/services/" . | xargs sed -i '' 's|img/services/|img/art/|g'

grep -rl --exclude-dir=_site --exclude-dir=.git --exclude-dir=img "img/slider/" . | xargs sed -i '' 's|img/slider/|img/art/|g'

grep -rl --exclude-dir=_site --exclude-dir=.git --exclude-dir=img "img/art/unusual-case-surveillance4.svg" . | xargs sed -i '' 's|img/art/unusual-case-surveillance4.svg|img/art/red-button.svg|g'

grep -rl --exclude-dir=_site --exclude-dir=.git --exclude-dir=img "img/logo/preloader.gif" . | xargs sed -i '' 's|img/logo/preloader.gif|img/art/preloader.gif|g'

__
## test commands

grep -r "ab2.jpg" --exclude-dir=_site --exclude-dir=.git ./

sed -i 's|img/about/ab2.jpg|img/art/ab2.jpg|g' 

__
# add padding on a pdf

inkscape red-button.svg -D --export-type=pdf --export-overwrite --export-margin=500



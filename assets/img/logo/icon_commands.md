
inkscape -w 16 -h 16 -o 16.png icon.svg
inkscape -w 32 -h 32 -o 32.png icon.svg
inkscape -w 48 -h 48 -o 48.png icon.svg

inkscape --export-type=png icon.svg

convert 16.png 32.png 48.png icon.ico
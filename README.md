# How to edit this website?

## Testing

For testing new things, create your own branch using git (easy if you use a git client program, such as sublime merge)
You can view the website offline (see below)
If you're unsure, merge your new branch into the drafts branch - you can then look at it online drafts.odap.ac.uk


## How to create a new file?
* Log into Github with your github account
* On this page, navigate to any of the files that you want to change (some are in subfolders).
* Editable files have an '.md' ending.
* Click on the file
* On the top right, there is small pencil-icon.
* Click that icon and edit the page.
* The page uses [Markdown], to create e.g., headings and make text __bold__ or _italic_.

## How to create a new file?
* Navigate to the folder you want a new file to be placed.
* On the top right, there is a button 'Create new File'.
* give the file a name with the ending '.md'.
* Edit the content of the page.
* Voila!

## How can I view the website offline?

* install jekyll
* Download all files, open a terminal window, navigate to the directory and enter:

     bundle exec jekyll serve




Alternatively, you can run Jekyll inside docker using:

    docker run -v $(pwd):/srv/jekyll -it jekyll/builder jekyll build
    
    !

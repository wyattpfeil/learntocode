```sh
setup 3D scene
    load 3D assets
    layout 3d assets on screen
    enable control of 3d world via keyboard and mouse
load instruction steps as array
for each instruction step
    display instructions to user
    if screen elements need to be visible
        toggle visibility of those elements
    if step requires code
        check that code is correct
        if correct
            execute code
            display world changes according to code
            if more steps left
                reveal next challenge letter
                proceed to next step
            else
                challenge complete
        else
            display error message to user
```

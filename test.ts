// tests go here; this will not be compiled when this package is used as an extension.


controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    info.changeLifeBy(1);
})
controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
    info.changeLifeBy(-1);
})

profilelife.setProfileImage(img`
    eeeeeeeeeeeeeeeeeeeeeeee
    e5555555555555555555555e
    e555555ccccc55555555555e
    e5555ccbbbbbc5555555555e
    e55ccddbbbbbbf555555555e
    e5cbbbddbbffbf555555555e
    e55ffffdbbffbff55555555e
    e55555fbbbbbbbf55555555e
    e55555fbbbbbbbff5555555e
    e5555ffbbbbbbbbfff55555e
    e5555f6bbbbbb663ddcc555e
    e555cc66bbbb666dddddc55e
    e555cd36666663dddddddc5e
    e555cddd3333dbddddddbcce
    e555cddddddddbdddddbbdde
    e555cddddddddbbdddbbddde
    e5555cddddddddbbdbbdddde
    e5555ccddddddddbbbbcccce
    e55555ccddddddddddddddbe
    e555555cccbddccbddddbbfe
    e555555c333bb333cbbfff5e
    e555555c33cc33cc3fff555e
    e5555555555555555555555e
    eeeeeeeeeeeeeeeeeeeeeeee
`)
scene.setBackgroundImage(sprites.background.forest1)
profilelife.setName("BIRDY-BIRD")
profilelife.setTextColor(0xF)
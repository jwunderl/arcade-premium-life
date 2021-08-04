// tests go here; this will not be compiled when this package is used as an extension.


controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    info.changeLifeBy(1);
})
controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
    info.changeLifeBy(-1);
})
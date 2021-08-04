
//% color=#cf6a87
//% weight=79.5
//% icon="\uf004"
//% blockGap=8
//% block="Profile Life"
namespace profilelife {

    class ProfileState {
        filledLifeImage: Image;
        emptyLifeImage: Image;
        profileImage: Image;
        name: string;
        maxLife: number;

        constructor() {
            this.filledLifeImage = img`
                . c c . c c .
                c 3 3 c 3 3 c
                c 3 3 3 1 3 c
                f 3 2 2 2 3 f
                f f 2 2 2 f f
                . f f 2 f f .
                . . f f f . .
            `;
            this.emptyLifeImage = img`
                . c c . c c .
                c b b c b b c
                c b b b b b c
                f b c c c b f
                f f c c c f f
                . f f c f f .
                . . f f f . .
            `;
            this.maxLife = 3;
        }
    }

    const profileLifeKey = "PROFILE_LIFE_SCENE_KEY";
    function init() {
        const scn = game.currentScene();
        if (scn.data[profileLifeKey])
            return;

        const MAX_LIFE = 3;
        const chosenFont = image.font5;
        game.currentScene().data[profileLifeKey] = new ProfileState();
        
        scene.createRenderable(99, function(target: Image, camera: scene.Camera) {
            const state = game.currentScene().data[profileLifeKey] as ProfileState;
            if (!state)
                return;

            info.showLife(false)

            if (info.life() > state.maxLife) {
                info.setLife(state.maxLife);
            }

            let leftOffset = 2;
            let topOffset = 2;
            if (state.profileImage) {
                target.drawTransparentImage(state.profileImage, 0, 0);
                leftOffset += state.profileImage.width;
            }

            if (state.name) {
                target.print(state.name, leftOffset, topOffset, 0xF, chosenFont);
                topOffset += chosenFont.charHeight + 2;
            }
            const currLife = info.life();
            for (let i = 0; i < MAX_LIFE; i++) {
                if (i < currLife) {
                    target.drawTransparentImage(
                        state.filledLifeImage,
                        leftOffset + i * (state.filledLifeImage.width + 1),
                        topOffset
                    );
                } else {
                    const filledLifeWidth = currLife * (state.filledLifeImage.width + 1);

                    target.drawTransparentImage(
                        state.emptyLifeImage,
                        leftOffset + (i - currLife) * (state.emptyLifeImage.width + 1) + filledLifeWidth,
                        topOffset
                    );
                }
            }
        });
    }
    init();
}
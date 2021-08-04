//% color=#cf6a87
//% weight=79.5
//% icon="\uf004"
//% blockGap=8
//% block="Profile Life"
namespace profilelife {
    class ProfileState {
        profileImage: Image;
        filledLifeImage: Image;
        emptyLifeImage: Image;
        name: string;
        font: image.Font;
        textColor: number;
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
            this.font = image.font5;
            this.textColor = 0xC;
        }
    }

    function getState(): ProfileState {
        return game.currentScene().data[profileLifeKey] as ProfileState;
    }

    const profileLifeKey = "PROFILE_LIFE_SCENE_KEY";
    function init(): ProfileState {
        const scn = game.currentScene();
        let profileState = scn.data[profileLifeKey]
        if (profileState)
            return profileState;

        profileState = game.currentScene().data[profileLifeKey] = new ProfileState();
        
        scene.createRenderable(95, function(target: Image, camera: scene.Camera) {
            const state = getState();
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
                target.print(state.name, leftOffset, topOffset, state.textColor, state.font);
                topOffset += state.font.charHeight + 2;
            }
            const currLife = info.life();
            for (let i = 0; i < state.maxLife; i++) {
                if (i < currLife) {
                    target.drawTransparentImage(
                        state.filledLifeImage,
                        leftOffset + i * (state.filledLifeImage.width + 1),
                        topOffset
                    );
                } else if (state.emptyLifeImage) {
                    const filledLifeWidth = currLife * (state.filledLifeImage.width + 1);

                    target.drawTransparentImage(
                        state.emptyLifeImage,
                        leftOffset + (i - currLife) * (state.emptyLifeImage.width + 1) + filledLifeWidth,
                        topOffset
                    );
                }
            }
        });

        return profileState;
    }

    //% block="set profile image $profile"
    //% profile.shadow=screen_image_picker
    //% weight=100
    export function setProfileImage(profile: Image) {
        const state = init();
        state.profileImage = profile;
    }

    //% block="set filled life image $filledImage"
    //% filledImage.shadow=screen_image_picker
    //% weight=40
    export function setFilledLifeImage(filledImage: Image) {
        if (!filledImage)
            return;
        const state = init();
        state.filledLifeImage = filledImage;
    }

    //% block="set empty life image $emptyImage"
    //% emptyImage.shadow=screen_image_picker
    //% weight=30
    export function setEmptyLifeImage(emptyImage: Image) {
        const state = init();
        state.emptyLifeImage = emptyImage;
    }

    //% block="set name to $name"
    //% name.defl="Bird"
    //% weight=75
    export function setName(name: string) {
        const state = init();
        state.name = name;
    }

    //% block="set text color $textColor"
    //% textColor.shadow="colorindexpicker";
    //% color.defl=12
    //% weight=70
    export function setTextColor(textColor: number) {
        const state = init();
        state.textColor = textColor;
    }

    export function setFont(font: image.Font) {
        const state = init();
        state.font = font;
    }

    //% block="set max life $maxLife"
    //% maxLife.defl=3
    //% weight=60
    export function setMaxLife(maxLife: number) {
        const state = init();
        state.maxLife = maxLife;
    }
}
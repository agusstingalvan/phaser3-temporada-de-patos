export default class Button {
  container;
  text;
  image;

  constructor(
    scene,
    x,
    y,
    atlas,
    texture,
    callback,
    text = null,
    textSize = 18,
    scale = 1,
    disabled = false
  ) {
    this.text = scene.add
      .text(0, 0, text, {
        fontSize: textSize,
        fontStyle: "bold",
        color: "white",
        fontFamily: "Montserrat",
      })
      .setOrigin(0.5);
    this.image = scene.add
      .image(0, 0, atlas, texture)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        if (!disabled) {
          scene.sonidos.sound.btnSFX.play();
          callback();
        }
      })
      .on("pointerover", () => {
        if (!disabled) {
          this.container.setScale(scale + 0.1);
        }
      })
      .on("pointerout", () => {
        if (!disabled) {
          this.container.setScale(scale);
        }
      });

    if (disabled) {
      this.image.setTint(0x808080); // Aplica un tinte gris para simular el efecto blanco y negro
    }

    this.container = scene.add
      .container(x, y, [this.image, this.text])
      .setScale(scale);
  }

  show() {
    this.container.visible = true;
  }

  hide() {
    this.container.visible = false;
  }
}

import { Toaster, Position } from "@blueprintjs/core";

export const TopToaster = Toaster.create({
  position: Position.TOP,
  timeout: 1500
});

export const BottomToaster = Toaster.create({
  position: Position.BOTTOM_LEFT,
  timeout: 1500
});

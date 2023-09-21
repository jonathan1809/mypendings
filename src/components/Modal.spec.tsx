import { render, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("should call onClose when clicked outside the modal content", () => {
    const onClose = jest.fn();

    const { container } = render(
      <Modal onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    fireEvent.mouseDown(container);

    expect(onClose).toHaveBeenCalled();
  });

  it("should call onClose when close button is clicked", () => {
    const onClose = jest.fn();

    const { getByTestId } = render(
      <Modal onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    const closeButton = getByTestId("close-button");

    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});

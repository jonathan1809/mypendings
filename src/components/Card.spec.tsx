// Unable to test react-dnd with the current configuration, still an issue of jest https://github.com/jestjs/jest/issues/13739
describe.skip("Card", () => {
  it.skip("renders the card with task details", () => {});
  //   const mockTask: CardProps["task"] = {
  //     id: "1",
  //     priority: "High",
  //     text: "Sample Task",
  //     status: StatusEnum.active,
  //     dueDate: "2022-01-01",
  //   };
  //   it("renders the card with task details", () => {
  //     render(
  //       <Card
  //         task={mockTask}
  //         index={0}
  //         moveCard={() => {}}
  //         markAsDone={() => {}}
  //         markAsDeleted={() => {}}
  //       />
  //     );
  //     expect(screen.getByText("Priority: High")).toBeInTheDocument();
  //     expect(screen.getByText("Description: Sample Task")).toBeInTheDocument();
  //     expect(screen.getByText("Status: Pending")).toBeInTheDocument();
  //     expect(screen.getByText("Due Date: 2022-01-01")).toBeInTheDocument();
  //   });
  //   it("calls markAsDone function when 'Mark as Done' button is clicked", () => {
  //     const mockMarkAsDone = jest.fn();
  //     render(
  //       <Card
  //         task={mockTask}
  //         index={0}
  //         moveCard={() => {}}
  //         markAsDone={mockMarkAsDone}
  //         markAsDeleted={() => {}}
  //       />
  //     );
  //     const markAsDoneButton = screen.getByText("Mark as Done");
  //     fireEvent.click(markAsDoneButton);
  //     expect(mockMarkAsDone).toHaveBeenCalledWith("1");
  //   });
  //   it("calls markAsDeleted function when 'Delete' button is clicked", () => {
  //     const mockMarkAsDeleted = jest.fn();
  //     render(
  //       <Card
  //         task={mockTask}
  //         index={0}
  //         moveCard={() => {}}
  //         markAsDone={() => {}}
  //         markAsDeleted={mockMarkAsDeleted}
  //       />
  //     );
  //     const deleteButton = screen.getByText("Delete");
  //     fireEvent.click(deleteButton);
  //     expect(mockMarkAsDeleted).toHaveBeenCalledWith("1");
  //   });
});

import { StatusTask } from "../../constants/status";

interface Task {
  id: string;
  priority: string;
  text: string;
  status: StatusTask;
  dueDate: string;
}

export default Task;

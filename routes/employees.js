import { Router } from "express";
import employees from "#db/employees";

const router = Router();

router.get("/", (req, res, next) => {
  try {
    res.send(employees);
  } catch (err) {
    next(err);
  }
});

router.get("/random", (req, res, next) => {
  try {
    const randomIndex = Math.floor(Math.random() * employees.length);
    res.send(employees[randomIndex]);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const employeeId = Number(id);

    const employee = employees.find((e) => e.id === employeeId);

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    res.send(employee);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    const { name } = req.body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).send("A valid 'name' field is required");
    }

    const maxId = employees.reduce(
      (max, emp) => (emp.id > max ? emp.id : max),
      0
    );
    const newEmployee = {
      id: maxId + 1,
      name: name.trim(),
    };

    employees.push(newEmployee);

    res.status(201).send(newEmployee);
  } catch (err) {
    next(err);
  }
});

export default router;

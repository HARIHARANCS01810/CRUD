import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import AddItemForm from "./AddItemForm";
import EditItemForm from "./EditItemForm";

import './Styles.css'

export default function ItemList() {
  const [employees, setEmployees] = useState([]);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getEmployees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log("Error fetching employees", error));
  }, []);

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setEditDialogOpen(true);
  };

  const handleAddItem = (newItem) => {
    axios
      .post("http://localhost:3001/createEmployees", newItem)
      .then((response) => {
        setEmployees([...employees, response.data]);
        setAddDialogOpen(false);
      })
      .catch((error) => console.log("Error adding employee", error));
  };

  const handleUpdateItem = (updatedItem) => {
    axios
      .put(
        `http://localhost:3001/updateEmployees/${updatedItem._id}`,
        updatedItem
      )
      .then(() => {
        const updatedEmployees = employees.map((employee) =>
          employee._id === updatedItem._id ? updatedItem : employee
        );
        setEmployees(updatedEmployees);
        setEditDialogOpen(false);
      })
      .catch((error) => console.log("Error updating employee", error));
  };

  const handleDeleteItem = (id) => {
    axios
      .delete(`http://localhost:3001/deleteEmployees/${id}`)
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== id)
        );
        setEditDialogOpen(false); 
      })
      .catch((error) => console.log("Error deleting employee", error));
  };

  return (
    <div className="card">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Employees List
          </h3>
          <p className="text-gray-600 mt-2">
            Here you can perform CRUD operations with this table
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <button
            type="button"
            class="inline-block rounded-full bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] add-emp-button"
            onClick={handleAddClick}
          >
            Add employee
          </button>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left table-class">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Username</th>
              <th className="py-3 px-6">E-Mail</th>
              <th className="py-3 px-6">Phone Number</th>
              <th className="py-3 px-6">Position</th>
              <th className="py-3 px-6">Salary</th>
              <th className="py-3 px-9">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {employees.map((item, idx) => (
              <tr key={idx}>
                <td className="flex items-center py-3 px-6 whitespace-nowrap">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.phonenumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.position}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.salary}</td>
                <td className="py-3 px-6 whitespace-nowrap">
                  <Button
                    color="primary"
                    startIcon={<PencilIcon className="h-5 w-5" />}
                    onClick={() => handleEditClick(item)}
                  >
                  </Button>
                  <Button
                    color="secondary"
                    startIcon={<TrashIcon className="h-5 w-5" />}
                    onClick={() => handleDeleteItem(item._id)}
                  >
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddItemForm
        open={isAddDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSubmit={handleAddItem}
      />

      {selectedEmployee && (
        <EditItemForm
          open={isEditDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          employee={selectedEmployee}
          onSubmit={handleUpdateItem}
        />
      )}
    </div>
  );
}

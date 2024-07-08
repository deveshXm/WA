import React, { useState } from "react";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { Form, Input } from "./styles";

const NewInspectionModal: React.FC<NewInspectionModalProps> = ({ isOpen, onClose, onSubmit, headers }) => {
  const [formData, setFormData] = useState<Record<string, CellData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: { value: e.target.value, style: "" } });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>New Inspection</h2>
      <Form onSubmit={handleSubmit}>
        {headers.map((header) => {
          return <Input key={header.key} name={header.key} placeholder={header.label} onChange={handleChange} type={header.type} required={true} />;
        })}
        <Button variant="primary" type="submit">
          Create Inspection
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Form>
    </Modal>
  );
};

export default NewInspectionModal;

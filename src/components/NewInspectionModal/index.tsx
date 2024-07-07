import React, { useState } from 'react';
import styled from 'styled-components';
import { NewInspectionModalProps } from '../../types';
import Button from '../Button';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const NewInspectionModal: React.FC<NewInspectionModalProps> = ({ onClose, onSubmit, headers }) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>New Inspection</h2>
        <Form onSubmit={handleSubmit}>
          {headers.map((header) => {
            if (header.key === 'createdAt') {
              return (
                <Input
                  key={header.key}
                  type="date"
                  name={header.key}
                  onChange={handleChange}
                />
              );
            }
            return (
              <Input
                key={header.key}
                name={header.key}
                placeholder={header.label}
                onChange={handleChange}
              />
            );
          })}
          <Button type="submit">Create Inspection</Button>
          <Button onClick={onClose}>Cancel</Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NewInspectionModal;
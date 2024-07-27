/* eslint-disable */
export default async () => {
    const t = {
        ["./modules/employee/domain/valueObjects/email.vo"]: await import("./modules/employee/domain/valueObjects/email.vo"),
        ["./modules/employee/domain/valueObjects/cpf.vo"]: await import("./modules/employee/domain/valueObjects/cpf.vo")
    };
    return { "@nestjs/swagger": { "models": [[import("./modules/employee/domain/entities/employee.entity"), { "Employee": { firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => t["./modules/employee/domain/valueObjects/email.vo"].EmailVO }, phone: { required: true, type: () => String }, hireDate: { required: true, type: () => Date }, credencialNumber: { required: true, type: () => String }, gestorId: { required: true, type: () => String }, document: { required: true, type: () => t["./modules/employee/domain/valueObjects/cpf.vo"].CPFVO } } }]], "controllers": [] } };
};
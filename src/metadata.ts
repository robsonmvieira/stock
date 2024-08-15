/* eslint-disable */
export default async () => {
    const t = {
        ["./modules/employee/domain/valueObjects/email.vo"]: await import("./modules/employee/domain/valueObjects/email.vo"),
        ["./modules/employee/domain/valueObjects/cpf.vo"]: await import("./modules/employee/domain/valueObjects/cpf.vo")
    };
    return { "@nestjs/swagger": { "models": [[import("./modules/employee/application/use-cases/employee/create-employee/dto/create-employee.dto"), { "CreateEmployeeDto": { firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String }, hireDate: { required: true, type: () => Date }, gestorId: { required: true, type: () => String }, document: { required: true, type: () => String }, jobPosition: { required: true, type: () => String }, password: { required: true, type: () => String }, credencialNumber: { required: true, type: () => String } }, "CreateEmployeeDtoPropsValidator": {} }], [import("./modules/employee/domain/entities/employee.entity"), { "Employee": { firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => t["./modules/employee/domain/valueObjects/email.vo"].EmailVO }, phone: { required: true, type: () => String }, hireDate: { required: true, type: () => Date }, credencialNumber: { required: true, type: () => String }, gestorId: { required: true, type: () => String }, document: { required: true, type: () => t["./modules/employee/domain/valueObjects/cpf.vo"].CPFVO }, jobPosition: { required: true, type: () => String }, vacationDays: { required: false, type: () => Number }, vacationDaysUsed: { required: false, type: () => Number }, vacationDaysRemaining: { required: false, type: () => Number }, vactionInUsed: { required: false, type: () => Boolean }, fireDate: { required: false, type: () => Date }, password: { required: true, type: () => String }, initialPassword: { required: true, type: () => String, nullable: true }, userChangePassword: { required: true, type: () => Boolean }, isManager: { required: true, type: () => Boolean } } }], [import("./modules/session/application/usecases/login/dto/login.dto"), { "LoginDtoProps": { email: { required: true, type: () => String }, password: { required: true, type: () => String } }, "LoginDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String } } }]], "controllers": [[import("./modules/employee/application/controllers/employee.controller"), { "EmployeeController": { "create": {} } }], [import("./modules/session/application/controllers/session.controller"), { "SessionController": { "login": {}, "cookies": {} } }]] } };
};
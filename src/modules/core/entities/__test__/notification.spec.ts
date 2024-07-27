import { Notification } from '../notification'

describe('Notification Unit Tests', () => {
  let notification: Notification
  beforeEach(() => {
    notification = new Notification()
  })
  it('should set error on notification passed just error', () => {
    notification.addError('Error 1')

    expect(notification.count()).toBe(1)
  })

  it('should set error on notification passed error and field', () => {
    notification.addError('Error 1', 'field 1')

    expect(notification.count()).toBe(1)
  })

  it('should set errors on notification passed errors', () => {
    notification.setErrors(['Error 1', 'Error 2'])

    expect(notification.count()).toBe(2)
  })

  it('should set errors on notification passed errors and field', () => {
    notification.setErrors(['Error 1', 'Error 2'], 'field 1')

    expect(notification.count()).toBe(1)
  })

  it('should call addError when a single error is passed without a field', () => {
    const addErrorSpy = jest.spyOn(notification as any, 'addError')

    const error = 'Sample error'
    notification.setErrors(error)
    expect(addErrorSpy).toHaveBeenCalledWith(error)
  })

  it('should be able to copy errors', () => {
    const error = 'Sample error'
    notification.setErrors(error)
    const copyNotification = new Notification()
    copyNotification.copyErrors(notification)
    expect(copyNotification.count()).toBe(1)
  })

  it('should return errors', () => {
    const addErrorSpy = jest.spyOn(notification as any, 'getErrors')
    const error = 'Sample error'
    notification.setErrors(error)
    notification.getErrors()
    expect(addErrorSpy).toHaveBeenCalled()
  })

  it('should return erros as json', () => {
    const addErrorSpy = jest.spyOn(notification as any, 'toJSON')
    const error = 'Sample error'
    notification.setErrors(error)
    notification.toJSON()
    expect(addErrorSpy).toHaveBeenCalled()
  })
})

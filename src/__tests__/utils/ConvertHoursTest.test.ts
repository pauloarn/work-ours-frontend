import {convertHoursToMinutes, convertMinutesToHours} from '../../utils/ConvertHours'

test("hoursToMinutesConversor", ()=>{
    expect(convertHoursToMinutes('06:20')).toBe(380);
    expect(convertHoursToMinutes('05:30')).toBe(330)
})

test("minutesToHoursConversor", ()=>{
    expect(convertMinutesToHours(380)).toBe('06:20')
    expect(convertMinutesToHours(330)).toBe('05:30')
})
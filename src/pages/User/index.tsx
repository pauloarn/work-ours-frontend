import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Paper,
    CircularProgress,
    IconButton
} from '@material-ui/core'
import dayjs from 'dayjs'
import { fetchUserWorkDayById, createWorkPointsDate, IDataToCreateWorkDay, resetUserWork } from '../../store/reducers/WorkPointsReducer'
import { useHistory, useParams } from 'react-router-dom'
import { rootState } from '../../store'
import styles from '../../styles/pages/User'
import {
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers'
import WorkPointTable from './components/WorkRegistersTable'
import {
    Schedule,
    ExitToApp
} from '@material-ui/icons'
import { convertMinutesToHours, convertHoursToMinutes } from '../../utils/ConvertHours'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export default function UsersPage() {
    const history = useHistory()
    const dispatch = useDispatch()


    const { userWorkDays, isFetchingUserWorkedDays } = useSelector(
        (state: rootState) => state.wokrPoint
    );

    const [entry, setEntry] = useState<Date | null>(new Date())
    const [lunchLeave, setLunchLeave] = useState<Date | null>(new Date())
    const [lunchEntry, setLunchEntry] = useState<Date | null>(new Date())
    const [leave, setLeave] = useState<Date | null>(new Date())
    const [date, setDate] = useState<Date | null>(new Date())
    const [treatedEntry, setTreatedEntry] = useState<string>('')
    const [treatedLunchLeave, setTreatedLunchLeave] = useState<string>('')
    const [treatedLunchEntry, setTreatedLunchEntry] = useState<string>('')
    const [treatedLeave, setTreatedLeave] = useState<string>('')
    const [treatedDate, setTreatedDate] = useState<string>('')

    const [alreadyRegister, setAlreadyRegister] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)

    useEffect(() => {
        if (entry) {
            setTreatedEntry(dayjs(entry).format('HH:mm'))
        }
    }, [entry])

    useEffect(() => {
        if (lunchLeave) {
            setTreatedLunchLeave(dayjs(lunchLeave).format('HH:mm'))
        }
    }, [lunchLeave])

    useEffect(() => {
        if (lunchEntry) {
            setTreatedLunchEntry(dayjs(lunchEntry).format('HH:mm'))
        }
    }, [lunchEntry])

    useEffect(() => {
        if (leave) {
            setTreatedLeave(dayjs(leave).format('HH:mm'))
        }
    }, [leave])

    useEffect(() => {
        if (date) {
            setTreatedDate(dayjs(date).format('YYYY-MM-DDTHH:mm:ss[Z]'))
        }
    }, [date])

    useEffect(() => {
        if (userWorkDays && userWorkDays.workedDays && date) {
            const aux = dayjs(date).format('DD-MM-YYYY')
            userWorkDays.workedDays.map(days => {
                if (days.date === aux) {
                    return setAlreadyRegister(true)
                } else {
                    return setAlreadyRegister(false)
                }
            })
        }
    }, [date, userWorkDays])

    // useEffect(() => {
    //     console.log(alreadyRegister)
    // }, [alreadyRegister])

    useEffect(() => {
        const token = localStorage.getItem("@token")
        if (token) {
            dispatch(fetchUserWorkDayById())
        } else {
            sendUserToHome()
        }
    }, [])
    useEffect(() => {
        const minutesEntry = convertHoursToMinutes(treatedEntry)
        const minutesLunchLeave = convertHoursToMinutes(treatedLunchLeave)
        const minutesLunchEntry = convertHoursToMinutes(treatedLunchEntry)
        const minutesLeave = convertHoursToMinutes(treatedLeave)

        if (minutesEntry >= minutesLunchLeave) {
            setHasError(true)
        } else if (minutesLunchLeave >= minutesLunchEntry) {
            setHasError(true)
        } else if (minutesLunchEntry >= minutesLeave) {
            setHasError(true)
        } else if (minutesEntry >= minutesLeave) {
            setHasError(true)
        } else {
            setHasError(false)
        }
    }, [treatedEntry, treatedLunchLeave, treatedLunchEntry, treatedLeave])

    const handleSubmit = () => {
        if (userWorkDays) {
            const dataToSend: IDataToCreateWorkDay = {
                userId: userWorkDays.id.toString(),
                date: treatedDate,
                entry: treatedEntry,
                lunchLeave: treatedLunchLeave,
                lunchEntry: treatedLunchEntry,
                leave: treatedLeave
            }
            dispatch(createWorkPointsDate(dataToSend, sendUserToHome))
        }
    }

    const sendUserToHome = () => {
        dispatch(resetUserWork)
        localStorage.clear()
        history.push('/')
    }

    return (
        <Grid container style={styles.wrapper}>
            <Grid container item style={styles.container}>
                {userWorkDays ? (
                    <>
                        <Grid container item style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Grid container item style={{ justifyContent: 'space-between' }}>
                                <Grid style={{ width: 60 }} />
                                <Typography style={{ fontSize: 25 }}>
                                    ??rea do Funcion??rio
                                </Typography>
                                <IconButton
                                    onClick={() => sendUserToHome()}
                                    size='medium'
                                >
                                    <ExitToApp />
                                </IconButton>
                            </Grid>
                            <Grid container style={{ flexDirection: 'column' }}>
                                <Typography>
                                    Nome do Usu??rio: {userWorkDays.name}
                                </Typography>
                                <Typography>
                                    Horas de Trabalho Di??rias: {convertMinutesToHours(userWorkDays.hoursToWork)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container item style={styles.textFieldContainer} spacing={1}>
                            <Grid container style={styles.datePicker}>
                                <KeyboardDatePicker
                                    disableFuture
                                    margin='normal'
                                    label="Data do Registro"
                                    value={date}
                                    onChange={(date: Date | null) => setDate(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                    format='dd/MM/yyyy'
                                    inputVariant='outlined'
                                    invalidDateMessage="Insira uma data v??lida"
                                    maxDateMessage="Data n??o pode ser depois do dia atual"
                                />
                            </Grid>
                            <Grid item>
                                <KeyboardTimePicker
                                    autoOk
                                    margin="normal"
                                    label="Entrada"
                                    ampm={false}
                                    value={entry}
                                    onChange={(date: Date | null) => setEntry(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                    inputVariant='outlined'
                                    keyboardIcon={<Schedule />}
                                    invalidDateMessage="Insira um horario v??lido"
                                    TextFieldComponent={(props: any) =>
                                        <TextField
                                            {...props}
                                            error={hasError}
                                            helperText={hasError ? 'Hor??rio deve ser anterior ao pr??ximo' : ''}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <KeyboardTimePicker
                                    autoOk
                                    margin="normal"
                                    label="Sa??da para Almo??o"
                                    ampm={false}
                                    value={lunchLeave}
                                    onChange={(date: Date | null) => setLunchLeave(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                    inputVariant='outlined'
                                    keyboardIcon={<Schedule />}
                                    invalidDateMessage="Insira um horario v??lido"
                                    TextFieldComponent={(props: any) =>
                                        <TextField
                                            {...props}
                                            error={hasError}
                                            helperText={hasError ? 'Hor??rio deve estar entre o pr??ximo e o anterior' : ''}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <KeyboardTimePicker
                                    autoOk
                                    margin="normal"
                                    label="Entrada do Almo??o"
                                    ampm={false}
                                    value={lunchEntry}
                                    onChange={(date: Date | null) => setLunchEntry(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                    inputVariant='outlined'
                                    invalidDateMessage="Insira um horario v??lida"
                                    keyboardIcon={<Schedule />}
                                    TextFieldComponent={(props: any) =>
                                        <TextField
                                            {...props}
                                            error={hasError}
                                            helperText={hasError ? 'Hor??rio deve estar entre o pr??ximo e o anterior' : ''}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <KeyboardTimePicker
                                    autoOk
                                    margin="normal"
                                    label="Sa??da"
                                    ampm={false}
                                    value={leave}
                                    onChange={(date: Date | null) => setLeave(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                    inputVariant='outlined'
                                    keyboardIcon={<Schedule />}
                                    invalidDateMessage="Insira um horario v??lida"
                                    TextFieldComponent={(props: any) =>
                                        <TextField
                                            {...props}
                                            error={hasError}
                                            helperText={hasError ? 'Hor??rio deve ser depois do anterior' : ''}
                                        />
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid>
                            <Button
                                variant='contained'
                                color='primary'
                                disabled={alreadyRegister || hasError}
                                onClick={handleSubmit}
                            >
                                {alreadyRegister ? 'Dia de Trabalho j?? Registrado' : 'Registrar Dia de Trabalho'}
                            </Button>
                        </Grid>
                        {userWorkDays && userWorkDays.workedDays ? (
                            <WorkPointTable
                                workedDays={userWorkDays}
                            />
                        ) : (
                            <Grid container style={{ justifyContent: 'center' }}>
                                <Typography>
                                    Usu??rio ainda n??o possui registro de horas trabalhadas
                                </Typography>
                            </Grid>
                        )

                        }
                    </>
                ) : (
                    <CircularProgress />
                )}
            </Grid>
        </Grid>
    )
}
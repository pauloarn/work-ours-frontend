import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { rootState } from '../../store'
import dayjs from 'dayjs'
import {
    createUser
} from '../../store/reducers/UserReducer'
import {
    TextField,
    Button,
    Grid,
    Typography,
    IconButton
} from '@material-ui/core'
import {
    Schedule,
    ArrowBack
} from '@material-ui/icons'

import {
    KeyboardTimePicker
} from '@material-ui/pickers'
import { useHistory } from 'react-router-dom'
import styles from '../../styles/pages/Register'

export default function RegisterPage() {

    const dispatch = useDispatch()
    const history = useHistory()

    const { isCreatingUser } = useSelector(
        (state: rootState) => state.user
    );

    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [hoursToWork, setHoursToWork] = useState<Date | null>(new Date())
    const [isWaitingForm, setIsWaitingForm] = useState<boolean>(true)


    useEffect(() => {
        if (name.length > 0 && password.length > 2 && hoursToWork !== null) {
            setIsWaitingForm(false)
        }
    }, [name, password, hoursToWork])

    const handlePickerValueChange = (date: Date | null) => {
        setHoursToWork(date)
    }

    const onSubmit = () => {
        if (!isWaitingForm && hoursToWork) {
            const hoursToWorkAux = dayjs(hoursToWork).format('HH:mm')
            dispatch(createUser({ hoursToWork: hoursToWorkAux, name: name, password: password }))
            history.push('/')
        }
    }

    return (
        <Grid container style={styles.wrapper}>
            <Grid container style={styles.container}>
                <Grid container style={{ justifyContent: 'space-between', marginBottom: -50 }}>
                    <IconButton
                        onClick={() => history.push('/')}
                        size='medium'
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography style={{ fontSize: 25 }}>
                        Página de Registro
                    </Typography>
                    <Grid style={{ width: 60 }} />
                </Grid>
                <Grid container style={{ flexDirection: 'column', alignItems: 'center' }} spacing={2}>
                    <Grid item>
                        <TextField
                            name='userName'
                            label="Nome do Usuário"
                            value={name}
                            onChange={(e: any) => setName(e.target.value)}
                            variant='outlined'
                            style={{ width: 300 }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label='Senha'
                            value={password}
                            type='password'
                            variant='outlined'
                            onChange={(e: any) => setPassword(e.target.value)}
                            style={{ width: 300 }}
                        />
                    </Grid>
                    <Grid>
                        <KeyboardTimePicker
                            autoOk
                            margin="normal"
                            label="Horas de Trabalho"
                            orientation="landscape"
                            ampm={false}
                            value={hoursToWork}
                            onChange={handlePickerValueChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            inputVariant='outlined'
                            style={{ width: 300 }}
                        />
                    </Grid>
                    <Button color='primary' size='large' variant='contained' onClick={() => onSubmit()} disabled={isCreatingUser || isWaitingForm} style={styles.submitButton}>
                        Registrar Usuário
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
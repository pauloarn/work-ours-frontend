import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { rootState } from '../../store'
import {
    createUserSession,
    awakeServer
} from '../../store/reducers/UserReducer'
import {
    TextField,
    Button,
    Grid,
    Typography,
    CircularProgress
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import styles from '../../styles/pages/Login'

export default function MainPage() {

    const dispatch = useDispatch()
    const history = useHistory()
    const { isCreatingSession, isAwakingServer } = useSelector(
        (state: rootState) => state.user
    );

    const [userId, setUserId] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isWaitingForm, setIsWaitingForm] = useState<boolean>(true)

    const onSuccess = () => {
        history.push(`/user`)
    }

    useEffect(() => {
        dispatch(awakeServer())
        const token = localStorage.getItem('@token')
        if (token) {
            history.push('/user')
        }
    }, [])

    useEffect(() => {
        if (userId.length > 0 && password.length > 2) {
            setIsWaitingForm(false)
        }
    }, [userId, password])

    const onSubmit = () => {
        if (!isWaitingForm) {
            const userIDNumber = Number(userId)
            dispatch(createUserSession({ userId: userIDNumber, password: password, onSuccess: onSuccess }))
        }
    }

    return (
        <Grid container style={styles.wrapper} title='backgroundContainer'>
            <Grid container item style={styles.container} title="formBoxContainer">
                {isAwakingServer ? (

                    <CircularProgress />
                ) : (
                    <>

                        <Grid container item style={{ justifyContent: 'center', }} title='boxHeader'>
                            <Typography style={{ fontSize: 25 }}>
                                LOGIN
                    </Typography>
                        </Grid>
                        <Grid container style={{ flexDirection: 'column', alignItems: 'center' }} spacing={2} title="formBoxContainer">
                            <Grid item>
                                <TextField
                                    name='userId'
                                    label="ID de Usuário"
                                    value={userId}
                                    onChange={(e: any) => setUserId(e.target.value.replace(/\D/g, ""))}
                                    variant='outlined'
                                    style={{ width: 300 }}
                                    title='userIdField'
                                />

                            </Grid>
                            <Grid>
                                <TextField
                                    label='Senha'
                                    value={password}
                                    type='password'
                                    variant='outlined'
                                    onChange={(e: any) => setPassword(e.target.value)}
                                    style={{ width: 300 }}
                                    title='userPasswordField'
                                />
                            </Grid>
                            <Button
                                color='primary'
                                size='large'
                                variant='contained'
                                onClick={() => onSubmit()}
                                disabled={isCreatingSession || isWaitingForm}
                                style={styles.submitButton}
                                title='submitLoginButton'
                            >
                                LogIn
                    </Button>
                        </Grid>
                        <Typography>Ainda não é cadastrado?</Typography>
                        <Button color="primary" size='small' variant='text' onClick={() => history.push('register')}>
                            Cadastre-se
                </Button>
                    </>
                )}
            </Grid>
        </Grid>
    )
}
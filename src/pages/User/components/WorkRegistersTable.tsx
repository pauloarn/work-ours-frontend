import React, { useState, useEffect } from 'react'
import { IUserWorkDays } from '../../../store/reducers/WorkPointsReducer'
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Grid,
    Button
} from '@material-ui/core'
import styles from '../../../styles/pages/User'
import { convertMinutesToHours } from '../../../utils/ConvertHours'

interface IProps {
    workedDays: IUserWorkDays
}
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const WorkRegistersTable = ({ workedDays }: IProps) => {
    const classes = useStyles();

    return (
        <Grid container style={styles.tableContainer}>
            <Typography style={{ marginBottom: 5 }}>
                Registros de Trabalho
            </Typography>
            <TableContainer component={Paper} >
                <Table className={classes.table} size='small' aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Dia</TableCell>
                            <TableCell align="center">Entrada</TableCell>
                            <TableCell align="center">Saida do Almoço</TableCell>
                            <TableCell align="center">Volta do Almoço</TableCell>
                            <TableCell align="center">Saída</TableCell>
                            <TableCell align="center">Horas Trabalhadas</TableCell>
                            <TableCell align="center">Horas Para Trabalhar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workedDays.workedDays.map(day =>
                            <TableRow>
                                <TableCell align="center">{day.date}</TableCell>
                                <TableCell align="center">{day.entry}</TableCell>
                                <TableCell align="center">{day.lunchLeave}</TableCell>
                                <TableCell align="center">{day.lunchEntry}</TableCell>
                                <TableCell align="center">{day.leave}</TableCell>
                                <TableCell align="center">{convertMinutesToHours(day.workedHours)}</TableCell>
                                <TableCell
                                    style={{ color: day.workedHours > workedDays.hoursToWork ? 'green' : 'red' }}
                                    align='center'
                                >
                                    {convertMinutesToHours(workedDays.hoursToWork)}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default WorkRegistersTable

import { render, fireEvent } from '@testing-library/react'
import Login from '../../../pages/Login'
import * as reactRedux from 'react-redux'
import { Provider } from 'react-redux'
import store from '../../../store'

it('loginUiRenderTest', () => {
    const { queryByTitle } = render(
        <Provider store={store}>
            <Login />
        </Provider>
    )
    const bgContainer = queryByTitle('submitLoginButton')
    expect(bgContainer).toBeTruthy();
})

test('loginUiTest', () => {
    expect('dsada').toBe('dsada')
})
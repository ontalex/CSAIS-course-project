import React from 'react'
import Header from '../../../components/Header'
import MainWrapper from '../../../components/MainWrapper'
import FormProfileUpdate from '../../../components/Forms/FormProfileUpdate'

export default function Profile() {
    return (
        <>
            <Header>Профиль</Header>
            <MainWrapper>
                <FormProfileUpdate />
            </MainWrapper>
        </>
    )
}

import React from 'react'
import { useSelector } from 'react-redux'
import CompetencesPage from '../../components/competences/CompetencesPage'
import MiniProfile from '../../components/competences/MiniProfile'

import { userDataSelector } from '../../selectors/account'
import Utils from '../../utils/index'

const Competences = () => {
    const userData = useSelector(userDataSelector)
    return (
        <div className="competences-page">
            <MiniProfile
                fullName={userData.fullName}
                avatar={Utils.getFileUrl(userData.avatarPath)}
                email={userData.email}
            />
            <CompetencesPage />
        </div>
    )
}

export default Competences

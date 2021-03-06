import * as React from 'react'
import {FC, useCallback} from 'react'
import {Button, IconButton, Typography} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {Field, Form, Formik} from 'formik'
import CloseIcon from '@material-ui/icons/Close'
import {DropzoneField} from '../../DropezoneFields'
import {closeCurrentDialog} from '../../../redux/dialogs/current-dialogs.actions'
import {
    DROPZONE_FORM_INIT_VALUES,
    GENERIC_DROPZONE_VALIDATION_SCHEMA,
} from '../../../containers/profile/profile.constants'
import {IProfileImageFields} from '../../../containers/profile/profile.types'
import {DEFAULT_REQUEST_ID} from 'fetch-with-redux-observable'
import {
    changeProfileImageAction,
    isChangeProfileImagePendingSelector
} from '../../../containers/profile/redux/profile.actions'

interface IEditProfileImageDialogProps {
}

const EditProfileImageDialog: FC<IEditProfileImageDialogProps> = () => {

    const isChangeProfileImagePending = useSelector(isChangeProfileImagePendingSelector)

    const dispatch = useDispatch()

    const handleClose = useCallback(() => {
        dispatch(closeCurrentDialog())
    }, [dispatch])

    /** @description Fetch to change profile image**/
    const handleSubmit = (values: IProfileImageFields) => {
        if (values.dropzone) {
            const formData = new FormData()
            formData.append('file', values.dropzone)

            dispatch(changeProfileImageAction.build(formData, DEFAULT_REQUEST_ID))
        }
    }

    return (
        <div className="row m-3" style={{minWidth: '600px'}}>
            <div className="col-12">
                <div className="row">

                    {/* TITLE */}
                    <div className="col-10 d-flex align-items-center">
                        <Typography variant="h5" color="primary">
                            Edit Profile Image
                        </Typography>
                    </div>

                    {/* CLOSE DIALOG ICON */}
                    <div className="col-2 text-end p-0">
                        <IconButton onClick={handleClose}
                                    color="secondary">
                            <CloseIcon/>
                        </IconButton>
                    </div>
                </div>

                <div className="row">
                    <Formik initialValues={DROPZONE_FORM_INIT_VALUES}
                            onSubmit={handleSubmit}
                            validationSchema={GENERIC_DROPZONE_VALIDATION_SCHEMA}>
                        <Form>

                            {/* UPLOAD FILE IMAGE */}
                            <div className="col-12 p-3">
                                <Field
                                    name={'dropzone'}
                                    component={DropzoneField}
                                    accept=".jpg, .jpeg, .svg, .png"
                                    multiple={false}
                                    maxSize={5000000}   //5 Megabyte
                                />
                            </div>

                            <div className="col-12 pb-1 pt-2 d-flex align-items-center justify-content-between">
                                <Button variant="contained"
                                        onClick={handleClose}
                                        color="secondary">
                                    ANNULLA
                                </Button>

                                {/* SUBMIT */}
                                <Button type="submit"
                                        variant="contained"
                                        disabled={isChangeProfileImagePending}
                                        className={`animate__animated animate__infinite ${isChangeProfileImagePending ? 'animate__pulse' : ''}`}>
                                    CONFERMA
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}
export default EditProfileImageDialog

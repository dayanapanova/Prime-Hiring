import {
    Card,
    CardHeader,
    Divider,
    Avatar,
    IconButton,
    Box,
    Typography,
    Checkbox,
    Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DeveloperItem = ({
    name,
    email,
    isHired,
    hiredOn,
    yearsOfExperience,
    pricePerHour,
    phoneNumber,
    location,
    technology,
    language,
    onEditClick,
    onDeleteClick,
    canSelect,
    onSelect,
    onUnHireClick,
}) => {
    const isShowSelect = canSelect && !isHired;
    return (
        <Card style={{ height: '100%' }}>
            <CardHeader
                avatar={
                    <div>
                        <Avatar>
                            {name?.substring(0, 1)}
                        </Avatar>
                    </div>
                }
                action={
                    <>
                        {isShowSelect ? (
                            <Checkbox onChange={onSelect} color='secondary' />
                        ) : (
                            <>
                                <IconButton onClick={onEditClick}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={onDeleteClick}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        )}
                    </>
                }
                title={<Typography variant='subtitle1'>{name}</Typography>}
                subheader={email}
            />

            <Divider />

            <Box p={2}>
                <Typography>Status: <strong>{isHired ? 'Hired' : 'Free'}</strong></Typography>
                {isHired && (
                    <Typography>Hired on: <strong>{hiredOn}</strong></Typography>
                )}
                <Typography>Years Experience: <strong>{yearsOfExperience}</strong></Typography>
                <Typography>Per hour: <strong>${pricePerHour}</strong></Typography>
                <Typography>Phone number: <strong>{phoneNumber}</strong></Typography>
                <Typography>Location: <strong>{location}</strong></Typography>
                <Typography>Technology: <strong>{technology}</strong></Typography>
                <Typography>Language: <strong>{language}</strong></Typography>
            </Box>
            {isHired && (
                <Box p={2} textAlign='center'>
                    <Button size='small' variant='outlined' onClick={onUnHireClick}>unhire developer</Button>
                </Box>
            )}
        </Card>
    )
};

export default DeveloperItem;

import Typography from '@mui/material/Typography';

interface TitleProps {
    text: string;
}

const Title = ({ text }: TitleProps) => {

    return <div className='bg-[#F8F9FA] py-6'>
        <Typography variant='h4' ml={3} textAlign={'center'} fontFamily={'monospace'}>
            {text}
        </Typography>
    </div>
}

export default Title;
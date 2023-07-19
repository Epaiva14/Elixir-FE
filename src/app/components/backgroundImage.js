export default function BackgroundImage() {
    const divStyle = {

        backgroundImage: `url('https://i.imgur.com/QuJqHP1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        height: '100vh',
        zIndex: -1,
        right: 0,
        bottom: 0,
        width: '100%'

    };

    return <div style={divStyle} />;
};

import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    input: {
        borderWidth: 2,
        borderColor: '#FFF',
        padding: 8,
        margin: 10,
        width: 350,
        backgroundColor:'white',

    },
    signInLogo: {
        marginBottom: 40,
        width: '90%',
        height: 140,

    },
    label: {
        fontSize: 23,
        color: 'white',

    },
    forgotPass: {
        margin: 20,
        color: 'white',
        fontSize: 15,

    },
    backgoundimage: {
        flex: 1,
        position: 'relative',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    button: {
        padding: 20,
        width: 300,

    },
    title: {
        textAlign: "center",
        marginVertical: 8,
        fontSize: 18,
        color: 'white',

    },
    Logo: {
        marginBottom: 40,
        width: "90%",
        height: 140,

    },
    qrCode: {
        margin: 20,
        
    },
});

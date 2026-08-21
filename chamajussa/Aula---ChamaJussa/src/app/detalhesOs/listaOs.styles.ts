import { StyleSheet } from 'react-native';

export const styles2 = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F5F7',
    alignItems: 'center'
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 20,
    width: '90%',
    maxWidth: 450,
    height: '80%',
    // maxHeight: 500,

    // alignItems: "center",

    // Sombra para iOS e Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  date: {
    fontSize: 13,
    color: '#7C7C7C',
    marginTop: 4,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  label: {
    fontSize: 12,
    color: '#7C7C7C',
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    paddingRight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#4A4A4A',
    lineHeight: 20,
    marginBottom: 20,
  },
  problemImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  button: {
    width: '90%',
    maxWidth: 450,


    borderWidth: 1.5,
    borderColor: '#0066FF',
    backgroundColor: '#EEF4FF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#0066FF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});


export const styles = StyleSheet.create({
  body: {
        width: `100%`,
        height: `100%`,
        alignItems: `center`,
        // paddingVertical: 10,
        // paddingHorizontal: 10,
        backgroundColor: `#F3F4F6`,
        gap: 10
    },

    titulo: {
        fontSize: 22,

    },
    card: {
        backgroundColor: `white`,
        width: `80%`,
        height: `80%`,
        paddingVertical: 5,
        paddingHorizontal: 22,
        gap: 15
        // fontSize: 20,
    },
    card_titulo: {
        gap: 10
    },

    subTitulo: {
        fontSize: 18,
    },

    lined_card: {
        flexDirection: "row",
        justifyContent: "space-around"
    },

    lined: {
        fontSize: 16,
        color: `#757575`

    },

    card_info:
    {
        // width: 30\
        flexDirection: `row`,
        // justifyContent: `space-between`,
        alignItems: `center`,
        paddingHorizontal: 4,
        // marginTop: 1,
        gap: 10
    },

    card_infoImg: {
        flex: 1,
        width: 20,
        backgroundColor: '#0553',
    },

    card_infoTextos: {
        gap: 3
    },

    card_infoTitulo: {
        color: `#757575`,
        fontSize: 17.5
    },

    card_infoSubtitulo: {

        fontSize: 17.5
    },


    linha_divisoria:
    {
        width: "100%",
        height: 2,
        backgroundColor: `#757575`,
        borderRadius: 2,
        alignSelf: `center`,
        marginTop: 2
    },

    card_descricao:
    {
        gap: 4
    },

    card_descricaoTitulo: {
        fontSize: 20
    },

    card_descricaoTexto: {
        fontSize: 16
    },


    card_imagem: {

    },

    card_imagemTitulo: {
        fontSize: 20
    },

    card_imagemFoto:
    {

    },

    botao: {

    },

    botaoTexto: {

    }

})
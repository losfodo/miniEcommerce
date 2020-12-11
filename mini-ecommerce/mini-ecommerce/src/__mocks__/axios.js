export default {  //Adaptador Axios que permite simular facilmente solicitações para fazer o test de listar-cidades..
    get: jest.fn().mockResolvedValue({ data: {} }),
    post: jest.fn().mockResolvedValue({ data: {} })
};

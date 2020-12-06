export class Contract {
  uid: string;
  dtSignature: string;
}

export class SignatureModel {
  signers : [
    {
      email: string,
      act: string,
      foreign: string,
      certificadoicpbr: string,
      assinatura_presencial: string,
      embed_methodauth: string
    }]
}

export class SignerModel{
    key_signer: string;
    email: string;
    act: string;
    foreign: string;
    certificadoicpbr: string;
    assinatura_presencial: string;
    assinatura_presencial_link: string;
    doc_auth: string;
    embed_methodauth: string;
    embed_smsnumber: string;
    upload_allow: string;
    upload_obs: string;
    docauthandselfie: string;
    skipemail: string;
    whatsapp: string;
    password_code: string;
    status: string;
}

export class Template{
  name_document: string;
  //uuid_folder: string; deixar sem folfer por enquanto
  templates: {
    "MjMwMjA": {
      nome: string;
      cpf: string;
      telefone: string;
      email: string;
      dtBirth: string;
      idade: string;
      rua: string;
      bairro: string;
      number: string;
      cidade: string;
      estado: string;
    }
  }
}

export class TemplateDependent{
  name_document: string;
  //uuid_folder: string; deixar sem folfer por enquanto
  templates: {
    "MjM1Mzc": {
      nome: string;
      cpf: string;
      telefone: string;
      email: string;
      dtBirth: string;
      idade: string;
      rua: string;
      bairro: string;
      number: string;
      cidade: string;
      estado: string;
      nome_dep: string;
      cpf_dep: string;
      parent: string;
      telefone_dep: string;
      idade_dep: string;
      dtBirth_dep: string;
      outro: string;
      contato_dep: string;
    }
  }
}

export class SendContract{
  skip_email: string;
  workflow:string;
}

export class Download{
  url: string;
  nome:string;
}


export class ListContract{
    uuidDoc: string;
    nameDoc: string;
    cpf: string;
    email: string;
    nome: string;
}

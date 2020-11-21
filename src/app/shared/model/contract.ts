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
    "MzQ2": {
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

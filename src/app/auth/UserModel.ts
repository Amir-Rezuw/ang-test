export class User {
  public name: string;
  public email: string;
  public password: string;
  public passwordConfirmation: string;
  public profile: string;
  public gender: string;
  public acceptedTerms: boolean;
  constructor(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    profile: string,
    gender: string,
    acceptedTerms: boolean
  ) {
    this.acceptedTerms = acceptedTerms;
    this.email = email;
    this.gender = gender;
    this.profile = profile;
    this.password = password;
    this.passwordConfirmation = passwordConfirmation;
    this.name = name;
  }
}

## Configuration

### Database setup

Copy the file `appsettings.example.json` to `appsettings.json` and adapt the database settings according to your setup.

Create the [database schema](Doc/Schema.sql) within your database.

## Development Env

**prerequisites**

Install:

- [node](https://nodejs.org/en/download/)

- [ASP.Net Core](https://www.microsoft.com/net/download/macos)

- [Postgres](https://www.postgresql.org)  
  Mac `brew cask install postgres`  

  | Host           | localhost              |
  | -------------- | ---------------------- |
  | Port           | 5432                   |
  | User           | your system username   |
  | Database       | same as user           |
  | Passwort       | none                   |
  | Connection URL | postgresql://localhost |



Start:

- Set environment variables

  ```bash
  # on Windows:
  set ASPNETCORE_ENVIRONMENT=Development
  # on Mac/Linux
  export ASPNETCORE_ENVIRONMENT=Development 
  ```

- run the app `dotnet run`

- open http://localhost:5000



## Instances

### DEV

Johnny `webspec61.mi.hdm-stuttgart.de` 

Alex `webspec62.mi.hdm-stuttgart.de` 

Janina `webspec63.mi.hdm-stuttgart.de` 

Daniel `webspec64.mi.hdm-stuttgart.de` 

Maxi `webspec65.mi.hdm-stuttgart.de` 

### PROD 
`webspec66.mi.hdm-stuttgart.de`



> App created with
>
> `dotnet new --install Microsoft.DotNet.Web.Spa.ProjectTemplates::2.0.0-rc1-final`
>
> `dotnet new angular`



# Agenda

- [ ] authetication
- [ ] signin/up
- [ ] userprofile/admin
- [ ] shopping cart
- [ ] wishlist
- [ ] order history
- [ ] checkout flow
- [ ] search/filter/categories
- [ ] product line
- [ ] product detail
- [ ] language switcher
- [ ] logging
# Github Action: Validate JSON
A GitHub Action that validates JSON files based on a JSON Schema.

## Usage

### Inputs

- `schema`: Relative file path under the repository of a JSON schema file to validate the other JSON files with. Default is: `'./schema.json'`.
- `jsons`: One or more relative file paths under the repository (seperated by comma) of the JSON files to validate with the schema provided.

> Note: `schema` is **required**, otherwise default will be used.

### Outputs

- `invalid`: One or more of relative file paths of the invalid JSON files, found in the repository (seperated by comma).

### Example Workflow

An example `.github/workflows/validate.yml` workflow to run JSON validation on the repository: 

```yaml
name: Validate JSON

on: [pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
    - uses: OrRosenblatt/validate-json-action@v1
    - with: 
        schema: /path/to/schema.json
        jsons: /path/to/file.json,/path/to/another/file.json
```


## TODOs

- [x] Initial validation action
- [ ] Github workflow screenshots
- [ ] Support `jsons` in PRs
- [ ] Support `schema` & `jsons` by external reference (from S3/GitHub/etc...)
- [ ] Support `delimiter` input 
# Github Action: Validate JSON
A GitHub Action that validates JSON files based on a JSON Schema.

This project uses [`ajv`](https://github.com/epoberezkin/ajv), fast JSON schema validator, to perform the validation. 

## Usage

### Inputs

- `schema`: Relative file path under the repository of a JSON schema file to validate the other JSON files with. Default is: `'./schema.json'`.
- `jsons`: One or more relative file paths under the repository (separated by commas) of the JSON files to validate with the schema provided.

> Note: `schema` is **required**, otherwise default will be used.

### Outputs

- `invalid`: One or more of relative file paths of the invalid JSON files, found in the repository (separated by commas).

### Example Workflow

An example `.github/workflows/validate.yml` workflow to run JSON validation on the repository: 

```yaml
name: Validate JSONs

on: [pull_request]

jobs:
  verify-json-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Validate JSON
        uses: docker://nhalstead00/validate-json-action:latest
        env:
          INPUT_SCHEMA: /path/to/schema.json
          INPUT_JSONS: /path/to/file.json,/path/to/another/file.json
```



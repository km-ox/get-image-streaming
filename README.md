# get-image-streaming

The lambda function uses the AWS JavaScript SDK v3 (including `Upload`, `S3Client`) to
- retrieve image from the URL supplied as the value of `rs_image_url` in the event payload
- upload these to a bucket

This repository is self-sufficient, and includes both source code and infrastructure-as-code

See [TODO](TODO.md)

### Resources

- When deployed, this provisions a CloudFormation stack consisting primarily of a Lambda function and s3 bucket, besides the other bits and bobs including permissions, etc.
- Invoke the Lambda function interactively using a test event such as
```json
{
  "rs_api_url": "https://example.com/path/to/image.jpg"
}
```

### Organisation

- handler source code in `src`
- A "SAM" template for infrastructure-as-code is at [template.yaml](template.yaml)
- When deployed, information describing the CloudFormation stack is in [samconfig.toml](/samconfig.toml)

```shell
$ npm install

# obtain AWS account credentials
$ sam build
$ sam deploy --guided
```
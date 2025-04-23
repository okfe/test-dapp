import { Card, Space } from 'antd-mobile';

function ProjectInfo() {
  if (process.env.NODE_ENV === 'development') return null;
  if (window.location.hostname !== 'okfe.github.io') return null;

  const githubUrl = 'https://github.com/okfe/test-demo';

  return (
    <Card title="项目信息">
      <Space direction="vertical">
        <div>
          version:&nbsp;
          {process.env.REACT_APP_PACKAGE_VERSION}
        </div>
        <div>
          github:&nbsp;
          <a href={githubUrl}>{githubUrl}</a>
        </div>
      </Space>
    </Card>
  );
}

export default ProjectInfo;

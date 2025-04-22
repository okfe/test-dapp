import {
  Button, Card, Form, Input,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';

function CallList() {
  return (
    <Form.List name="callList">
      {(fields, { add, remove }) => (
        <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
          {fields.map((field) => (
            <Card
              size="small"
              title={`Call ${field.name + 1}`}
              key={field.key}
              extra={(
                <CloseOutlined
                  onClick={() => {
                    remove(field.name);
                  }}
                />
              )}
            >
              <Form.Item label="Address" name={[field.name, 'address']}>
                <Input />
              </Form.Item>
              <Form.Item label="Value" name={[field.name, 'value']}>
                <Input />
              </Form.Item>
              <Form.Item label="Data" name={[field.name, 'data']}>
                <Input />
              </Form.Item>
            </Card>
          ))}
          <Button type="dashed" onClick={() => add()} block>
            + Add Call
          </Button>
        </div>
      )}
    </Form.List>
  );
}

export default CallList;

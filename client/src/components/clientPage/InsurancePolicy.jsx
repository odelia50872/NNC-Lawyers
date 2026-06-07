import DocumentList from './DocumentList';

function InsurancePolicy() {
    return <DocumentList endpoint="insurance-policies" emptyText="אין פוליסות ביטוח" icon="🛡️" />;
}

export default InsurancePolicy;

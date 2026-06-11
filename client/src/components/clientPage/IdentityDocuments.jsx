import DocumentList from './DocumentList';

function IdentityDocuments() {
    return <DocumentList endpoint="identity-documents" emptyText="אין תעודות זיהוי" icon="🪪" groupByYear={false} title="תעודות זיהוי" />;
}

export default IdentityDocuments;
